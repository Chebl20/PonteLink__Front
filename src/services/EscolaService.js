import { supabase } from '../supaBaseClient.jsx'; // Verifique o caminho
import { Escola } from '../models/Escola.js';
import { Endereco } from '../models/Endereco.js';

/**
 * NOTA DE ARQUITETURA:
 * Este serviço foi ajustado para uma estrutura de banco de dados onde a tabela 'enderecos'
 * possui uma coluna de chave estrangeira 'escola_id' que aponta para a tabela 'escolas'.
 * Isso representa uma relação um-para-um.
 */

/**
 * Função auxiliar para mapear dados do DB para uma instância de Escola.
 * Lida com o objeto de endereço aninhado que vem da consulta.
 */
function _mapToEscolaInstance(dbData) {
    if (!dbData) return null;

    // Para uma relação um-para-um, o Supabase geralmente retorna o item relacionado como um objeto, não um array.
    const enderecoData = dbData.enderecos;
    const enderecoInstance = enderecoData ? new Endereco(enderecoData) : null;

    // Remove a propriedade 'enderecos' para não duplicar dados no construtor da Escola.
    const { enderecos, ...escolaData } = dbData;

    return new Escola({ ...escolaData, endereco: enderecoInstance });
}

/**
 * Busca todas as escolas e seus respectivos endereços.
 */
export async function getAllEscolas() {
    const { data, error } = await supabase
        .from('escolas')
        // A '!' indica ao Supabase que a chave estrangeira está na tabela 'enderecos'.
        .select('*, enderecos!escola_id(*)')
        .order('nome', { ascending: true });

    if (error) {
        console.error("Erro ao buscar escolas com endereços:", error);
        throw new Error("Não foi possível buscar os dados das escolas.");
    }
    return data.map(_mapToEscolaInstance);
}

/**
 * Cria uma nova escola e seu endereço associado.
 */
export async function createEscola(escolaData) {
    const { endereco, ...dadosPrincipaisEscola } = escolaData;

    if (!dadosPrincipaisEscola.nome) throw new Error("O campo 'nome' é obrigatório.");
    if (!endereco) throw new Error("Dados de endereço são obrigatórios.");

    // Passo 1: Inserir a escola (sem endereço) para obter um ID.
    const { data: escolaCriada, error: erroEscola } = await supabase
        .from('escolas')
        .insert([dadosPrincipaisEscola])
        .select('id')
        .single();

    if (erroEscola) {
        console.error("Erro Supabase (create escola):", erroEscola);
        throw new Error(`Erro ao criar a escola: ${erroEscola.message}`);
    }

    if (!escolaCriada || !escolaCriada.id) {
        console.error("Falha ao obter o ID da escola recém-criada. Verifique as políticas de RLS (SELECT) na tabela 'escolas'.");
        throw new Error("Não foi possível obter o ID da escola após a criação. Verifique as permissões de SELECT.");
    }

    // Passo 2: Preparar e inserir o endereço, incluindo a referência para a escola recém-criada.
    const dadosEndereco = { ...endereco, escola_id: escolaCriada.id };
    const { error: erroEndereco } = await supabase
        .from('enderecos')
        .insert([dadosEndereco]);

    if (erroEndereco) {
        console.error("Erro Supabase (create endereço):", erroEndereco);
        // Limpeza: se a criação do endereço falhar, remove a escola órfã.
        await supabase.from('escolas').delete().eq('id', escolaCriada.id);
        throw new Error(`Erro ao criar o endereço: ${erroEndereco.message}`);
    }

    // Passo 3: Buscar e retornar a escola recém-criada com todos os dados aninhados.
    const { data: dadosFinais } = await supabase
        .from('escolas')
        .select('*, enderecos!escola_id(*)')
        .eq('id', escolaCriada.id)
        .single();

    return _mapToEscolaInstance(dadosFinais);
}

/**
 * ATUALIZA uma escola e/ou seu endereço.
 * Se a escola não tiver um endereço, um novo será criado.
 */
export async function updateEscola(id, escolaData) {
    const { endereco, ...dadosPrincipaisEscola } = escolaData;

    // Atualiza os dados principais da escola, se houver.
    if (Object.keys(dadosPrincipaisEscola).length > 0) {
        const { error } = await supabase.from('escolas').update(dadosPrincipaisEscola).eq('id', id);
        if (error) throw new Error(`Erro ao atualizar dados da escola: ${error.message}`);
    }

    // --- INÍCIO DA NOVA LÓGICA DE VALIDAÇÃO ---
    // Se dados de endereço foram enviados, decide se deve criar ou atualizar.
    if (endereco) {
        // 1. Verifica se já existe um endereço para esta escola.
        const { data: enderecoExistente } = await supabase
            .from('enderecos')
            .select('id')
            .eq('escola_id', id)
            .maybeSingle(); // .maybeSingle() não dá erro se não encontrar nada, retorna null.

        if (enderecoExistente) {
            // 2. Se existe, ATUALIZA.
            const { error } = await supabase.from('enderecos').update(endereco).eq('escola_id', id);
            if (error) throw new Error(`Erro ao atualizar dados do endereço: ${error.message}`);
        } else {
            // 3. Se não existe, CRIA um novo com o ID da escola.
            const dadosParaCriar = { ...endereco, escola_id: id };
            const { error } = await supabase.from('enderecos').insert([dadosParaCriar]);
            if (error) throw new Error(`Erro ao criar novo endereço para a escola: ${error.message}`);
        }
    }
    // --- FIM DA NOVA LÓGICA ---

    // Retorna a escola completamente atualizada com o endereço.
    const { data: dadosFinais } = await supabase
        .from('escolas')
        .select('*, enderecos!escola_id(*)')
        .eq('id', id)
        .single();

    return _mapToEscolaInstance(dadosFinais);
}

/**
 * DELETA uma escola e seu endereço associado.
 */
export async function deleteEscola(id) {
    // A configuração ON DELETE CASCADE no banco de dados já deve cuidar da remoção do endereço.
    // Mas para garantir, podemos fazer a remoção manual primeiro.
    const { error: erroEndereco } = await supabase.from('enderecos').delete().eq('escola_id', id);
    if (erroEndereco) {
        console.error("Erro ao deletar endereço associado:", erroEndereco);
    }

    const { error: erroEscola } = await supabase.from('escolas').delete().eq('id', id);
    if (erroEscola) {
        console.error("Erro ao deletar escola:", erroEscola);
        throw new Error("Não foi possível deletar a escola.");
    }
}
