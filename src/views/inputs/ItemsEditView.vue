<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3 aria-label="Alteração de dados de item existente">Alterar Item</h3>
            </div>
            <div class="card-body">

                <ul class="alert alert-danger" v-if="errorList.length > 0">
                    <div class="mb-0 ms-3">
                        <ul>
                            <li v-for="error in errorList">{{ error }}</li>
                        </ul>
                    </div>
            </ul>
                <div class="mb-3">
                    <label aria-label="Nome do item">Nome</label>
                    <input type="text" v-model="model.item.name" class="form-control" aria-describedby="campo para inserir o nome">
                </div>
                <div class="mb-3">
                    <label aria-label="Descrição do item">Descrição</label>
                    <input type="text" v-model="model.item.description" class="form-control" aria-describedby="campo para inserir descrição">
                </div>
                <div class="mb-3">
                    <label aria-label="Status do item">Status</label>
                    <select v-model="model.item.status" :disabled="model.item.status == 'Emprestado'" class="form-select form-control" aria-describedby="seleção do status do item">
                        <option disabled value="">Selecione...</option>
                        <option v-for="status in itemStatus" :disabled="status == 'Emprestado'">{{ status }}</option>
                    </select>
                </div>
                <div class="float-end">
                    <button type="button" @click="checkForm" class="btn btn-primary m-2" aria-describedby="botão para salvar item">Salvar</button>
                    <button type="reset" @click="cancelForm" class="btn btn-secondary" aria-describedby="botão para cancelar o formulário">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {

    name: 'itemsEditView',
    data() {
        return {
            errorList: [] as string[],
            model: {
                item: {
                    name: '',
                    description: '',
                    status: null
                }
            },
            itemStatus: [
                'Disponivel',
                'Quebrado',
                'Perdido',
                'Emprestado'
            ]
        }
    },
    mounted() {
      this.getItem()
    },
    methods: {
        saveItem() {

            console.log(this.model.item.status)

            var $this = this;
            var url = '/api/item/update/' + this.$route.params.id
            axios.put(url,{
            name : this.model.item.name,
            description : this.model.item.description,
            status : this.model.item.status})
            .then(result => {
                alert(result.data.message)
                this.$router.push('/items')
            })
            .catch(function (error){
                if(error.response.status == 400){
                   $this.errorList.push("Ocorreu um erro ao salvar o item, verifique o preenchimento de todos os campos e tente novamente.")
                } else if(error.response.status == 500){
                    $this.errorList.push("Ocorreu um erro interno no servidor, tente novamente mais tarde.")
                } else {
                    $this.errorList.push("Ocorreu um erro desconhecido, tente novamente mais tarde.")
                }
            })
        },
        getItem() {
            var $this = this;
            var url = '/api/item/' + this.$route.params.id
            axios.get(url)
            .then(result => {
                this.model.item.name = result.data.name
                this.model.item.description = result.data.description
                this.model.item.status = result.data.status
            })
            .catch(function (error){
                if(error.response.status == 400){
                   $this.errorList.push("Ocorreu um erro ao buscar o item, verifique o preenchimento de todos os campos e tente novamente.")
                } else if(error.response.status == 500){
                    $this.errorList.push("Ocorreu um erro interno no servidor, tente novamente mais tarde.")
                } else {
                    $this.errorList.push("Ocorreu um erro desconhecido, tente novamente mais tarde.")
                }
            })
        },
        cancelForm() {
            this.$router.push('/items')
        },
        checkForm: function (e: any) {
            this.errorList = [];

            if (this.model.item.name == '') {
                this.errorList.push('O nome é obrigatório.');
            }
            if (this.model.item.description == '') {
                this.errorList.push('A descrição é obrigatória.');
            }
            if (this.model.item.status == null) {
                this.errorList.push('O status é obrigatório.');
            }

            if(!this.errorList.length){
                this.saveItem();
            };
        }
    }
}
</script>