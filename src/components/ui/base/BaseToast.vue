<template>
    <Teleport to="body">
        <div class="toast align-items-center position-absolute text-bg-primary border-0 shadow d-block" role="alert"
            aria-live="assertive" aria-atomic="true" :class="isResult ? 'bg-primary' : 'bg-danger'">
            <div class="d-flex">
                <div class="toast-body">
                    {{ message }}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="closeToast"></button>
            </div>
        </div>
    </Teleport>
</template>
<script setup>
let props = defineProps({
    message: String,
    isResult: Boolean
})
let emit = defineEmits(["closeToast"]);
const closeToast = () => emit("closeToast")
</script>
<style scoped>
.toast {
    bottom: 5%;
    right: 3%;
}
</style>