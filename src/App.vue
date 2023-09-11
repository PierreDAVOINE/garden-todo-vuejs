<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Pages from './pages/Index.vue'
import LoginModal from './components/LoginModal.vue';
import { useInterfaceStore } from './stores/interface';

const interfaceState = useInterfaceStore();

</script>

<template>
    <LoginModal v-if="interfaceState.modalIsOpen" />
    <Header />
    <Pages />
    <Footer />
</template>

<style scoped lang="scss"></style>
