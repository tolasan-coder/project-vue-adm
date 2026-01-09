<template>
  <div>
    <!-- top bar -->
    <div
      class="d-flex justify-content-between align-items-center mb-3 rounded-3"
    >
      <h1 class="d-flex align-items-center gap-2 mb-0">
        <i class="bx bx-news"></i>
        All Articles
      </h1>

      <RouterLink :to="{ name: 'article.create' }">
        <base-button>
          <i class="bx bx-plus-circle me-1"></i>
          Create Article
        </base-button>
      </RouterLink>
    </div>

    <!-- delete modal -->
    <base-modal v-if="isModal" @close="isModal = false">
      <template #title>
        <span class="d-flex align-items-center gap-2 text-danger">
          <i class="bx bx-error-circle"></i>
          Delete Article?
        </span>
      </template>

      <template #body> Are you sure you want to delete this article? </template>

      <template #footer>
        <base-button
          variant="danger"
          @click="handleDelete"
          :isLoading="isLoadingDelete"
        >
          <i class="bx bx-trash me-1"></i>
          Delete
        </base-button>
      </template>
    </base-modal>

    <!-- table -->
    <div class="table-round">
      <base-table
        :columns="columns"
        :items="articleStore.my_article"
        :isLoading="articleStore.my_loading"
        @edit="onEdit"
        @delete="onDelete"
      >
        <!-- title -->
        <template #column-title="{ item }">
          <span class="fw-medium line-clamp-1">
            {{ item.title }}
          </span>
        </template>

        <!-- thumbnail -->
        <template #column-thumbnail="{ item }">
          <img
            v-if="item.thumbnail"
            :src="item.thumbnail"
            alt="thumbnail"
            width="60"
            height="40"
            class="rounded object-fit-cover"
          />
          <span v-else class="text-muted d-flex align-items-center gap-1">
            <i class="bx bx-image-alt"></i>
            No image
          </span>
        </template>

        <!-- category -->
        <template #column-category="{ item }">
          <span class="fw-medium d-flex align-items-center gap-1">
            <i class="bx bx-category"></i>
            {{ item.category?.name ?? "-" }}
          </span>
        </template>

        <!-- content -->
        <template #column-content="{ item }">
          <span class="line-clamp-1 w-70">
            {{ item.content }}
          </span>
        </template>
      </base-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "@/stores/article";

const articleStore = useArticleStore();
const router = useRouter();

const isModal = ref(false);
const selectId = ref(null);
const isLoadingDelete = ref(false);

onMounted(() => {
  articleStore.getOwnArticle();
});

const columns = [
  { key: "title", label: "Title" },
  { key: "thumbnail", label: "Thumbnail" },
  { key: "category", label: "Category" },
  { key: "content", label: "Content" },
];

const onEdit = (id) => {
  router.push({ name: "edit.article", params: { id } });
};

const onDelete = (id) => {
  selectId.value = id;
  isModal.value = true;
};

const handleDelete = async () => {
  if (!selectId.value) return;

  isLoadingDelete.value = true;
  try {
    await articleStore.deleteArticle(selectId.value);
    await articleStore.getOwnArticle();
    isModal.value = false;
    selectId.value = null;
  } catch (error) {
    console.error(error);
  } finally {
    isLoadingDelete.value = false;
  }
};
</script>

<style scoped>
.bx {
  font-size: 1.1rem;
  vertical-align: middle;
}
</style>
