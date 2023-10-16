<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3>Novo Empréstimo</h3>
            </div>
            <div class="card-body">
                <ul class="alert alert-danger" v-if="errorList.length > 0">
                    <div class="mb-0 ms-3">
                        {{ errorList }}
                    </div>
                </ul>
                <div class="mb-3">
                    <label for="">Requerente</label>
                    <select v-model="model.loan.applicantId" size="5" class="form-select form-control">
                        <option disabled value="">Selecione...</option>
                        <option v-for="applicant in applicants" :key="applicant.id" :value="applicant.id" :selected="true">
                            {{ applicant.name }}</option>
                    </select>
                    <label for="">Item</label>
                    <select v-model="model.loan.itemId" size="5" class="form-select form-control">
                        <option disabled value="">Selecione...</option>
                        <option v-for="item in items" :key="item.id" :value="item.id"
                            :disabled="item.status == 'Emprestado'">{{ item.name
                            }}</option>
                    </select>
                    <label for="">Dias para devolução</label>
                    <input type="text" v-model="model.loan.devolutionDays" class="form-control">
                </div>
                <div class="float-end">
                    <button type="button" @click="saveLoan" class="btn btn-primary m-2">Salvar</button>
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
            errorList: '',
            applicants: [] as Applicant[],
            items: [] as Item[],
            model: {
                loan: {
                    itemId: '',
                    applicantId: '',
                    devolutionDays: ''
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
                    if (error.response.status == 400) {
                        $this.errorList = error.response.data.message
                    } else if (error.response.status == 500) {
                        $this.errorList = "Ocorreu um erro interno no servidor, tente novamente mais tarde."
                    } else {
                        $this.errorList = "Ocorreu um erro desconhecido, tente novamente mais tarde."
                    }
                })
        },
        cancelForm() {
            this.$router.push('/loans')
        }
    }
}
</script>