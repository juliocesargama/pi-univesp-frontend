<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Requerentes
                    <RouterLink to="/applicants/create" class="btn btn-primary float-end">Novo Requerente</RouterLink>
                </h3>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th><b>Nome</b></th>
                            <th><b>Telefone</b></th>
                            <th><b>Ações</b></th>
                        </tr>
                    </thead>
                    <tbody v-if="applicants.length > 0">
                        <tr v-for="applicant in applicants" :key="applicant.id">
                            <td>{{ applicant.name }}</td>
                            <td>{{ applicant.phone }}</td>
                            <td><RouterLink :to="{path: '/applicants/'+applicant.id+'/edit'}" class="btn btn-primary">Alterar</RouterLink></td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="4">Carregando Requerentes...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { type Applicant } from "../model/Applicant";

export default {

    name: 'applicants-view',
    data() {
        return {
            applicants: [] as Applicant[]
        }
    },
    mounted() {
        this.getApplicants()
    },
    methods: {
        getApplicants() {
            var url = 'api/applicant/all';
            return axios.get(url).then(result => this.applicants = result.data);
        }
    },
}
</script>

