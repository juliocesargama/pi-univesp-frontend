<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <RouterLink class="navbar-brand" to="/" aria-current-value="Página Inicial">E-Materiais</RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ms-auto mb-2 mb-lg-0">
                <RouterLink class="nav-link" to="/loans" aria-current-value="Empréstimos">Empréstimos</RouterLink>
                <RouterLink class="nav-link" to="/items" aria-current-value="Itens">Itens</RouterLink>
                <RouterLink class="nav-link" to="/applicants" aria-current-value="Requerentes">Requerentes</RouterLink>
                <RouterLink class="nav-link" to="/about" aria-current-value="Sobre">Sobre</RouterLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
