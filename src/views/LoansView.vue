<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3>Empréstimos
                    <RouterLink to="/loans/create" class="btn btn-primary float-end">Novo Empréstimo</RouterLink>
                </h3>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th><b>Item</b></th>
                            <th><b>Requerente</b></th>
                            <th><b>Data de Empréstimo</b></th>
                            <th><b>Data de Devolução</b></th>
                            <th><b>Situação</b></th>
                            <th><b>Ações</b></th>
                        </tr>
                    </thead>
                    <tbody v-if="loans.length > 0">
                        <tr v-for="loan in loans" :key="loan.loanId">
                            <td>{{ loan.itemName }}</td>
                            <td>{{ loan.applicantName }}</td>
                            <td>{{ loan.loanDate }}</td>
                            <td>{{ loan.loanDevolution }}</td>
                            <td>{{ loan.loanStatus }}</td>
                            <td>
                                <button type="button" v-if="loan.loanStatus != 'Devolvido'" class="btn btn-primary"
                                    @click="setDevolution(loan.loanId)">
                                    Devolver</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="4">Carregando Empréstimos...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { type Loan } from "../model/Loan";

export default {

    name: 'loans-view',
    data() {
        return {
            loans: [] as Loan[]
        }
    },
    mounted() {
        this.getLoans("Todos")
    },
    methods: {
        getLoans(status: string) {
            var url = '/api/loan/find/' + status;
            return axios.get(url).then(result => this.loans = result.data);
        },
        setDevolution(loanId: number) {
            var url = '/api/devolution/' + loanId;
            return axios.post(url).then(result => {
                alert(result.data.message);
                this.getLoans("Todos");
            });
        }
    },
}
</script>