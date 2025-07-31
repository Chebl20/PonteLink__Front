



import React, { useState } from 'react';

import { useEscolas } from '../hooks/useEscolas.js';

import EscolaList from '../components/escola/EscolaList.jsx';

import EscolaForm from '../components/escola/EscolaForm.jsx';

// 1. IMPORTAÇÃO: O componente de detalhes é importado.

import EscolaDetalhes from '../components/escola/EscolaDetalhes.jsx';

import TopBar from '../components/TopBar.jsx';

import NavBar from '../components/NavBar.jsx';
import escolasIcon from "../assets/escolas.png";

import { Plus } from 'lucide-react';



export default function EscolasPage() {

    const {

        escolas, loading, error, addEscola, editEscola, removeEscola,

        showModal, setShowModal,

    } = useEscolas();



    const [escolaToEdit, setEscolaToEdit] = useState(null);



    // 2. ESTADOS DO MODAL DE DETALHES: Estados para controlar a visibilidade e os dados do modal de detalhes.

    const [escolaToView, setEscolaToView] = useState(null);

    const [showDetalhesModal, setShowDetalhesModal] = useState(false);



    const handleCancel = () => {

        setShowModal(false);

        setEscolaToEdit(null);

    };



    // 3. FUNÇÃO PARA FECHAR O MODAL DE DETALHES: Limpa o estado e fecha o modal.

    const handleCloseDetalhes = () => {

        setShowDetalhesModal(false);

        setEscolaToView(null);

    };



    const handleSave = (formData) => {

        const dadosParaSalvar = {

            ...formData,

            status: formData.status === 'Ativa'

        };



        if (escolaToEdit) {

            editEscola(escolaToEdit.id, dadosParaSalvar);

        } else {

            addEscola(dadosParaSalvar);

        }

        handleCancel();

    };



    const handleEdit = (escola) => {

        setEscolaToEdit(escola);

        setShowModal(true);

    };



    // 4. FUNÇÃO PARA ABRIR O MODAL DE DETALHES: Define a escola a ser visualizada e abre o modal.

    const handleViewDetails = (escola) => {

        setEscolaToView(escola);

        setShowDetalhesModal(true);

    };



    const handleDelete = (id) => {

        if (window.confirm('Tem certeza que deseja excluir esta escola?')) {

            removeEscola(id);

        }

    };



    return (

        <div className="dashboard-page">

            <TopBar />

            <NavBar />



            <main className="dashboard-main-content">

                <div className="header-escolas-page">

                    <h2>Gerenciamento de Escolas</h2>

                    <button className="btn-purple" onClick={() => {

                        setEscolaToEdit(null); // Garante que o form estará limpo

                        setShowModal(true);

                    }}>

                        <Plus size={16} /> Nova Escola

                    </button>

                </div>



                {loading && <p>Carregando escolas...</p>}

                {error && <p style={{ color: 'red' }}>Erro: {error}</p>}



                {!loading && !error && (

                    <EscolaList

                        escolas={escolas}

                        onEdit={handleEdit}

                        onDelete={handleDelete}

                        // 5. PASSANDO A FUNÇÃO: A função para abrir os detalhes é passada para a lista.

                        onViewDetails={handleViewDetails}

                    />

                )}



                {/* Modal de Formulário (existente) */}

                {showModal && (

                    <EscolaForm

                        onSubmit={handleSave}

                        onClose={handleCancel}

                        escolaAtual={escolaToEdit}

                    />

                )}



                {/* 6. RENDERIZAÇÃO CONDICIONAL: O modal de detalhes é renderizado aqui quando seu estado de visibilidade for verdadeiro. */}

                {showDetalhesModal && (

                    <EscolaDetalhes

                        escola={escolaToView}

                        onClose={handleCloseDetalhes}

                    />

                )}

            </main>

        </div>

    );

} 