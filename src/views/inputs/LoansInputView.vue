<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3 aria-label="Formulário para inclusão de novo empréstimo">Novo Empréstimo</h3>
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
                    <label aria-label="Nome do requerente">Requerente</label>
                    <select v-model="model.loan.applicantId" size="5" class="form-select form-control" aria-describedby="Caixa de seleção para definir o requerente do empréstimo">
                        <option disabled value="">Selecione...</option>
                        <option v-for="applicant in applicants" :key="applicant.id" :value="applicant.id" :selected="true">
                            {{ applicant.name }}</option>
                    </select>
                    <label aria-label="Item solicitado">Item</label>
                    <select v-model="model.loan.itemId" size="5" class="form-select form-control" aria-describedby="Caixa de seleção para definir o item a ser emprestado">
                        <option disabled value="">Selecione...</option>
                        <option v-for="item in items" :key="item.id" :value="item.id"
                            :disabled="item.status != 'Disponivel'">{{ item.name
                            }}</option>
                    </select>
                    <label aria-label="Quantidade de dias para devolução">Dias para devolução</label>
                    <input type="number" v-model="model.loan.devolutionDays" class="form-control">
                </div>
                <div class="float-end">
                    <button type="button" @click="checkForm" class="btn btn-primary m-2">Salvar</button>
                    <button type="reset" @click="cancelForm" class="btn btn-secondary">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import type { Applicant } from "@/model/Applicant";
import type { Item } from "@/model/Item";
import axios from "axios";

export default {
    name: 'loansInputView',
    data() {
        return {
            errorList: [] as string[],
            applicants: [] as Applicant[],
            items: [] as Item[],
            model: {
                loan: {
                    itemId: 0,
                    applicantId: 0,
                    devolutionDays: 0
                }
            },
        }
    },
    mounted() {
        this.getApplicants();
        this.getItems();
    },
    methods: {
        getApplicants() {
            var url = '/api/applicant/all';
            return axios.get(url).then(result => this.applicants = result.data);
        },
        getItems() {
            var url = '/api/item/all';
            return axios.get(url).then(result => this.items = result.data);
        },
        saveLoan() {
            var $this = this;
            var url = '/api/loan/new'
            axios.post(url, {
                itemId: this.model.loan.itemId,
                applicantId: this.model.loan.applicantId,
                devolutionDays: this.model.loan.devolutionDays
            })
                .then(result => {
                    alert(result.data.message)
                    this.$router.push('/loans')
                }).catch(function (error) {
                    if (error.response.status == 400 || error.response.status == 404) {
                        $this.errorList.push(error.response.data.message)
                    } else if (error.response.status == 500) {
                        $this.errorList.push("Ocorreu um erro interno no servidor, tente novamente mais tarde.")
                    } else {
                        $this.errorList.push("Ocorreu um erro desconhecido, tente novamente mais tarde.")
                    }
                })
        },
        cancelForm() {
            this.$router.push('/loans')
        },
        checkForm: function (e: any) {
            this.errorList = [];

            if (this.model.loan.applicantId == 0) {
                this.errorList.push('Selecionar o requerente é obrigatório.');
            }
            if (this.model.loan.itemId == 0) {
                this.errorList.push('Selecionar o item é obrigatório.');
            }
            if (this.model.loan.devolutionDays == 0) {
                this.errorList.push('Definir a quantidade de dias para devolução é obrigatório.');
            }
            if(!this.errorList.length){
                this.saveLoan();
            };
        }
    }
}
</script>