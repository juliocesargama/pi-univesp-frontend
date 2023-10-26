<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Items
                    <RouterLink to="/items/create" class="btn btn-primary float-end" aria-describedby="Botão para criar novo item">Novo Item</RouterLink>
                </h3>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th><b>Nome</b></th>
                            <th><b>Descrição</b></th>
                            <th><b>Status</b></th>
                            <th><b>Ações</b></th>
                        </tr>
                    </thead>
                    <tbody v-if="items.length > 0">
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.status }}</td>
                            <td><RouterLink :to="{path: '/items/'+item.id+'/edit'}" class="btn btn-primary" aria-label="Botão de alterar dados do item">Alterar</RouterLink></td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="4">Carregando itens...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { type Item } from "../model/Item";

export default {

    name: 'items-view',
    data() {
        return {
            items: [] as Item[]
        }
    },
    mounted() {
        this.getItems()
    },
    methods: {
        getItems() {
            var url = 'api/item/all';
            return axios.get(url).then(result => this.items = result.data);
        }
    },
}
</script>

