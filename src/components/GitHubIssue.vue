<template>
  <div class="container">
    <h2>{{issue.number}} - {{issue.title}}</h2>
    <p>{{issue.url}}</p>
    <p>{{issue.body}}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GitHubIssue',
  created() {
    this.get();
  },
  data() {
    return {
      issue: {},
      loading: {
        issue: false,
      },
    };
  },
  methods: {
    get() {
      this.error = {};

      this.loading.issue = true;

      const url = `https://api.github.com/repos/${this.$route.params.username}/${this.$route.params.repository}/issues/${this.$route.params.number}`;

      axios.get(url)
        .then((response) => {
          this.issue = response.data;
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => {
          this.loading.issue = false;
        });

      return true;
    },
  },
};
</script>
