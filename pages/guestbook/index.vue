<template>
  <div class="container">
    <h2>Say hello</h2>
    <form @submit.prevent="submitForm">
      <CInputGroup mt="4">
        <CInput
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />
      </CInputGroup>

      <CInputGroup mt="3">
        <CInput
          v-model="title"
          placeholder="Title"
          required
        />
      </CInputGroup>

      <!-- I can't make it work with CTextarea -->
      <div class="mt-3" id="t-area">
        <textarea
          class="chakra-textarea css-1sol8y5"
          v-model="message"
          placeholder="Your text..."
          required
        />
      </div>

      <CButton
        type="submit"
        :disabled="!isValid"
        class="mt-3"
        >
          Submit
      </CButton>
    </form>

    <div v-if="entries.length" class="mt-6">
      <h2>Guestbook</h2>
      <div v-for="entry in entries" :key="entry.id" class="mt-5">
        <CBox p="5" shadow="md" borderWidth="1px">
        <CHeading size="md">{{ entry.title }}</CHeading>
        <CText mt="2">{{ entry.text }}</CText>
        <CText mt="2" color="gray.500">Submitted by: {{ entry.email }}</CText>
        </CBox>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CInput,
  CInputGroup,
  CButton,
  CBox,
  CHeading,
  CText
} from '@chakra-ui/vue'

export default {
  data () {
    return {
      email: '',
      title: '',
      message: '',
      submitted: false,
      entries: []
    }
  },
  components: {
    CInput,
    CInputGroup,
    CButton,
    CBox,
    CHeading,
    CText
  },
  computed: {
    isValidEmail () {
      return this.email.includes('@')
    },
    isValid () {
      return !!this.title && !!this.message && this.isValidEmail
    }
  },
  async created () {
    const response = await this.$http.$get('/api/entries')
    this.entries = response
  },
  methods: {
    async submitForm () {
      if (this.isValid) {
        await this.$http.post('/api/entries', {
          email: this.email,
          title: this.title,
          text: this.message
        })
        this.submitted = true

        const response = await this.$http.$get('/api/entries')
        this.entries = response
      }
    }
  }
}
</script>

<style scoped>
  .container {
    max-width: 700px;
    margin: 0 auto;
    padding: 1rem;
  }
  .mt-3 {
    margin-top: 1rem;
  }
  .mt-5 {
    margin-top: 1.5rem;
  }
  .mt-6 {
    margin-top: 2rem;
  }
  #t-area textarea {
    width: 100%;
    border-radius: 0.25rem;
    height: 150px;
    border: 1px solid rgb(226, 232, 240);
    padding: 0.5rem 1rem;
  }
  #t-area textarea:focus {
    outline: none;
    border-color: rgb(49, 130, 206);
    box-shadow: rgb(49, 130, 206) 0px 0px 0px 1px;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 900;
  }
</style>
