<template >
  <div class="card flex justify-center">
    <Button text   icon="pi pi-search" :loading="loading"  />
    </div>
</template>
<script setup>
import { ref ,computed, onMounted} from 'vue';
const loading = ref(false);

onMounted(
    () => {
    loading.value = true;
}
);
</script>