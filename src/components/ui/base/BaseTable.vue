<template>
  <table class="table align-middle">
    <thead class="table-light">
      <tr>
        <th v-for="col in columns" :key="col.key">
          {{ col.label }}
        </th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>

    <!-- loding data  -->
    <tbody v-if="isLoading">
      <tr v-for="n in 5" :key="n">
        <td :colspan="columns.length + 1">
          <div class="placeholder-glow">
            <span class="placeholder bg-secondary col-12"></span>
          </div>
        </td>
      </tr>
    </tbody>

    <tbody v-else>
      <!-- ber ot mean data vea show -->
      <tr v-if="!items.length">
        <td :colspan="columns.length + 1" class="text-center py-5">
          <p class="fw-semibold mb-0">No data found</p>
        </td>
      </tr>

      <!-- ber mean data -->
      <tr v-for="item in items" :key="item.id">
        <td v-for="col in columns" :key="col.key">
          <slot :name="`column-${col.key}`" :item="item">
            {{ item[col.key] }}
          </slot>
        </td>

        <td class="text-center w-25">
          <button class="btn btn-sm me-2" @click="$emit('edit', item.id)">
            <i
              class="bx bx-edit p-2 rounded-3"
              style="font-size: 26px; background-color: #d0fae5; color: #00a63e"
            ></i>
          </button>
          <button class="btn btn-sm -danger" @click="$emit('delete', item.id)">
            <i
              class="bx bx-trash me-1 p-2 rounded-3"
              style="font-size: 24px; background-color: #ffc9c9; color: #e7000b"
            ></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  columns: Array,
  items: Array,
  isLoading: Boolean,
});

defineEmits(["edit", "delete"]);
</script>

<!-- apply styles css -->
<style scoped>
table {
  overflow: hidden;
  border-left: 1px solid #dddd;
  border-right: 1px solid #dddd;
  border-collapse: separate;
  border-radius: 14px !important;
  box-shadow: inset;
}
</style>
