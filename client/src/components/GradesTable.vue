<script setup lang="ts">
import { useGradesStore } from '@/store/grades';
import { storeToRefs } from 'pinia';
import { NDataTable } from 'naive-ui';
import { useGrades } from '@/hooks/useGrades';
import { NButton } from 'naive-ui';

const gradesStore = useGradesStore();
const { grades } = storeToRefs(gradesStore);

const { forceRescrape } = useGrades();
</script>

<template>
  <n-button type="primary" @click="forceRescrape">Refresh</n-button>
  <n-data-table
    :data="grades"
    :columns="[
      { title: 'Subject', key: 'subject' },
      { title: 'Name', key: 'name' },
      { title: 'Grade', key: 'grade' },
      { title: 'Date', key: 'date' },
    ]"
    :pagination="{ itemCount: 20 }"
  />
</template>
