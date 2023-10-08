<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3>Alterar Requerente</h3>
            </div>
            <div class="card-body">

                <ul class="alert alert-danger" v-if="errorList.length > 0">
                    <div class="mb-0 ms-3">
                        {{ errorList }}
                    </div>
                </ul>
                <div class="mb-3">
                    <label for="">Nome</label>
                    <input type="text" v-model="model.applicant.name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Telefone</label>
                    <input type="text" v-model="model.applicant.phone" class="form-control">
                </div>
                <div class="float-end">
                    <button type="button" @click="saveApplicant" class="btn btn-primary m-2">Salvar</button>
                    <button type="reset" @click="cancelForm" class="btn btn-secondary">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {

    name: 'applicantEditView',
    data() {
        return {
            errorList: '',
            model: {
                applicant: {
                    name: '',
                    phone: ''
                }
            }
        }

    },
    mounted() {
        this.getApplicant()
    },
    methods: {
        saveApplicant() {
            var $this = this;
            var url = '/api/applicant/update/' + this.$route.params.id
            axios.put(url, {
                name: this.model.applicant.name,
                phone: this.model.applicant.phone
            })
                .then(result => {
                    alert(result.data.message)
                    this.$router.push('/applicants')
                })
                .catch(function (error) {
                    if (error.response.status == 400) {
                        $this.errorList = "Ocorreu um erro ao salvar o requerente, verifique o preenchimento de todos os campos e tente novamente."
                    } else if (error.response.status == 500) {
                        $this.errorList = "Ocorreu um erro interno no servidor, tente novamente mais tarde."
                    } else {
                        $this.errorList = "Ocorreu um erro desconhecido, tente novamente mais tarde."
                    }
                })
        },
        getApplicant() {
            var $this = this;
            var url = '/api/applicant/' + this.$route.params.id
            axios.get(url)
                .then(result => {
                    this.model.applicant.name = result.data.name
                    this.model.applicant.phone = result.data.phone
                })
                .catch(function (error) {
                    if (error.response.status == 400) {
                        $this.errorList = "Ocorreu um erro ao buscar o requerente, verifique o preenchimento de todos os campos e tente novamente."
                    } else if (error.response.status == 500) {
                        $this.errorList = "Ocorreu um erro interno no servidor, tente novamente mais tarde."
                    } else {
                        $this.errorList = "Ocorreu um erro desconhecido, tente novamente mais tarde."
                    }
                })
        },
        cancelForm() {
            this.$router.push('/applicants')
        },
    }

}
</script>