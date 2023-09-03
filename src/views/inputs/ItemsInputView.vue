<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3>Novo Item</h3>
            </div>
            <div class="card-body">
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
                    <select v-model="model.item.status" class="form-select form-control">
                        <option disabled value="">Selecione...</option>
                        <option v-for="status in itemStatus" :key="status" :value="status">{{ status }}</option>
                    </select>
                </div>
                <div class="float-end">
                    <button type="button" @click="saveItem" class="btn btn-primary m-2">Salvar</button>
                    <button type="reset" class="btn btn-secondary">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {

    name: 'itemsInputView',
    data() {
        return {
            errorList: [],
            model: {
                item: {
                    name: '',
                    description: '',
                    status: ''
                }
            },
            itemStatus: [
                'AVAILABLE',
                'Quebrado',
                'Emprestado',
                'Perdido'
            ]
        }

    },
    methods: {
        saveItem() {
            var url = '/api/item/save'
            axios.post(url,{
            name : this.model.item.name,
            description : this.model.item.description,
            status : this.model.item.status})
            .then(result => {
                console.log(result.data)
                this.$router.push('/items')
            })
        }
    }

}
</script>