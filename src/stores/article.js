import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useArtitleStore = defineStore("article", () => {
  let articles = ref([]);
  let article = ref(null);
  let my_article = ref([]);

  let isLoadding = ref(false);
  let my_loading = ref(false);

  //   get all article
  const getAllArticle = async () => {
    try {
      isLoadding.value = true;
      const res = await api.get("/articles");
      articles.value = res.data.data.items;
    } catch (error) {
      console.log(error);
    } finally {
      isLoadding.value = false;
    }
  };

  //   get a article by id
  const getArticleById = async (id) => {
    try {
      console.log(id);
      const res = await api.get(`/articles/${id}`);
      article.value = res.data.data;
      // console.log("aArtice:", article.value);
    } catch (error) {
      console.log(error);
    }
  };

  // get own article
  const getOwnArticle = async () => {
    try {
      my_loading.value = true;
      const res = await api.get(`/articles/own`);
      // console.log("Own Article: ", res.data.data.items);
      my_article.value = res.data.data.items;
      my_loading.value = false;
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Success");
    }
  };

  // create article
  const createArticle = async (payload) => {
    try {
      const res = await api.post(`/articles`, payload);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Error");
    }
  };

  // create thumnail article
  const createThumbnail = async (id, payload) => {
    try {
      const res = await api.post(`/articles/${id}/thumbnail`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // delete article
  const deleteArticle = async (id) => {
    try {
      const res = await api.delete(`/articles/${id}`);
      console.log("delete article mss:", res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    getAllArticle,
    getArticleById,
    getOwnArticle,
    createArticle,
    createThumbnail,
    deleteArticle,
    my_article,
    my_loading,
    isLoadding,
    articles,
    article,
  };
});
