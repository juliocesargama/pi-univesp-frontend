<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3>Alterar Item</h3>
            </div>
            <div class="card-body">

                <ul class="alert alert-danger" v-if="errorList.length > 0">
                    <div class="mb-0 ms-3">
                        {{ errorList }}
                    </div>
            </ul>
                <div class="mb-3">
                    <label for="">Nome</label>
                    <input type="text" v-model="model.item.name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Descrição</label>
                    <input type="text" v-model="model.item.description" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Status</label>
                    <select v-model="model.item.status" :disabled="model.item.status == 'Emprestado'" class="form-select form-control">
                        <option disabled value="">Selecione...</option>
                        <option v-for="status in itemStatus" :disabled="status == 'Emprestado'">{{ status }}</option>
                    </select>
                </div>
                <div class="float-end">
                    <button type="button" @click="saveItem" class="btn btn-primary m-2">Salvar</button>
                    <button type="reset" @click="cancelForm" class="btn btn-secondary">Cancelar</button>
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
            errorList: '',
            model: {
                item: {
                    name: '',
                    description: '',
                    status: ''
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
                   $this.errorList = "Ocorreu um erro ao salvar o item, verifique o preenchimento de todos os campos e tente novamente."
                } else if(error.response.status == 500){
                    $this.errorList = "Ocorreu um erro interno no servidor, tente novamente mais tarde."
                } else {
                    $this.errorList = "Ocorreu um erro desconhecido, tente novamente mais tarde."
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
                   $this.errorList = "Ocorreu um erro ao buscar o item, verifique o preenchimento de todos os campos e tente novamente."
                } else if(error.response.status == 500){
                    $this.errorList = "Ocorreu um erro interno no servidor, tente novamente mais tarde."
                } else {
                    $this.errorList = "Ocorreu um erro desconhecido, tente novamente mais tarde."
                }
            })
        },
        cancelForm() {
            this.$router.push('/items')
        },
    }

}
</script>