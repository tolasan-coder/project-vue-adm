import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const isLoading = ref(false);

  const fetchCategories = async () => {
    try {
      isLoading.value = true;
      const res = await api.get("/categories");
      categories.value = res.data.data.items;
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return { categories, isLoading, fetchCategories };
});
