<script setup lang="ts">
import { NForm, NFormItem, NInput, NButton, useNotification } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';
import { useSettingsStore } from '@/store/settings';

const notification = useNotification();
const { changeSettings } = useSettings();
const settingsStore = useSettingsStore();
const formRef = ref<any>(null);
const formValue = ref({
  url: '',
  pin: '',
});

const rules = {
  url: {
    required: true,
    message: 'Please enter your url for schulNetz.mobile',
    trigger: 'blur',
  },
  pin: {
    required: true,
    message: 'Please enter your pin for schulNetz.mobile',
    trigger: 'blur',
  },
};

const handleValidateClick = () => {
  formRef.value?.validate((async (err) => {
    if (!err) {
      await changeSettings({
        url: formValue.value.url,
        pin: formValue.value.pin,
      });
      notification.success({
        title: 'Success',
        content: 'Saved your credentials',
        duration: 3 * 1000,
      });
    }
  }) as (_: unknown) => void);
};

onMounted(() => {
  if (settingsStore.settings) {
    formValue.value = settingsStore.settings;
  } else {
    settingsStore.$subscribe((_mutation, state) => {
      if (state.settings) {
        formValue.value = state.settings;
      }
    });
  }
});
</script>

<template>
  <n-form v-model:model="formValue" :rules="rules" ref="formRef">
    <n-form-item label="Url" path="url">
      <n-input
        type="textarea"
        :autosize="{
          minRows: 2,
          maxRows: 4,
        }"
        v-model:value="formValue.url"
      />
    </n-form-item>
    <n-form-item label="Pin" path="pin">
      <n-input
        type="password"
        show-password-on="click"
        v-model:value="formValue.pin"
      />
    </n-form-item>
    <n-form-item>
      <n-button @click.prevent="handleValidateClick">Set Url & Pin</n-button>
    </n-form-item>
  </n-form>
</template>
