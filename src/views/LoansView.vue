<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <div class="d-flex">
                    <h3 class="me-auto m-2">Empréstimos</h3>
                    <select class="form-select m-2" v-model="status" style="width: 200px;" @change="setFilterStatus()" aria-describedby="Campo de seleção para filtrar por status de empréstimo">
                        <option value="" disabled selected>Filtro</option>
                        <option v-for="(status, index) in loanStatus" :key="status" :value="status">{{ status }}</option>

                    </select>
                    <RouterLink to="/loans/create" class="btn btn-primary m-2" aria-describedby="Botão para efetuar novo empréstimo">Novo Empréstimo</RouterLink>
                </div>
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
                                    @click="setDevolution(loan.loanId)" aria-describedby="Botão para efetuar a devolução do empréstimo">
                                    Devolver</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="notFoundParams == true">
                        <tr>
                            <td colspan="6">Nenhum Empréstimo Encontrado nos parâmetros definidos.</td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="notFoundParams == false">
                        <tr>
                            <td colspan="6">Carregando Empréstimos...</td>
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
            status: '',
            notFoundParams: false,
            loans: [] as Loan[],
            loanStatus: [
                'Todos',
                'Andamento',
                'Atrasado',
                'Devolvido'
            ]
        }
    },
    mounted() {
        this.checkDelayed();
        this.getLoans("Todos")
    },
    methods: {
        getLoans(status: string) {
            var url = '/api/loan/find/' + status;
            var result = axios.get(url).then(result => this.loans = result.data);
            return result;
        },
        setDevolution(loanId: number) {
            var url = '/api/devolution/' + loanId;
            return axios.post(url).then(result => {
                alert(result.data.message);
                this.getLoans("Todos");
            });
        },
        setFilterStatus() {

            var response = this.getLoans(this.status).then(result => {
                if (result.data == null) {
                    this.notFoundParams = true;
                } 
            });
            return response;
        },
        checkDelayed() {
            var url = '/api/loan/check-delayed';
            return axios.post(url).then(result => console.log(result.data.message));
        }
    },
}
</script>