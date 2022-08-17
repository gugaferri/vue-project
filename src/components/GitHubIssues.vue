<template>
  <div class="container">
    <h1 class="text-center">VueJs + Github</h1>
    <p class="lead text-center">
      Show repositories from <a href="#">Github.com</a>
    </p>

    <div class="row">
      <div class="col p-1">
        <input
          v-model="username"
          type="text"
          class="form-control"
          placeholder="GitHub Username">
      </div>

      <div class="col p-1">
        <input
          v-model="repository"
          type="text"
          class="form-control"
          placeholder="GitHub Repository">
      </div>
    </div>

    <div class="row text-center">
      <div class="col m-3">
        <input type="button" value="Find" class="btn btn-success" @click.prevent.stop="find()">
        <input type="button" value="Clear" class="btn btn-danger" @click.prevent.stop="clear()">
        <img src="/static/loading.gif" width="20" v-if="loading.issues">
      </div>
    </div>
    <div class="row text-center">
      <div class="col m-3">
        {{ error ? error.message : ''}}
      </div>
    </div>
    <div class="row text-center">
      <div class="col m-3">
        github.com/repos/{{username||'SET USERNAME'}}/{{repository||'SET REPOSITORY'}}
      </div>
    </div>

    <div class="row">
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th width="15%" scope="col">Number</th>
            <th scope="col">Title</th>
            <th width="15%" scope="col">Show</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(issue, index) in issues" :key="index">
            <td scope="row">{{issue.number}}</td>
            <td scope="row">{{issue.title}}</td>
            <td scope="row">
              <router-link class="btn btn-primary"
                :to="{
                  name: 'Issue',
                  params: {
                    username: username,
                    repository: repository,
                    number: issue.number
                  }
                }">
                <i class="bi bi-eye"></i>
              </router-link>
            </td>
          </tr>
          <tr v-if="issues.length == 0">
            <td scope="row" colspan="3">No registries</td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GitHubIssues',
  data() {
    return {
      username: '',
      repository: '',
      error: {},
      issues: [],
      loading: {
        issues: false,
      },
    };
  },
  created() {
    this.setForm();
  },
  watch: {
    username() {
      this.handleProps();
    },
    repository() {
      this.handleProps();
    },
  },
  methods: {
    setForm() {
      if (localStorage.getItem('gitHubIssuesFormData') !== null) {
        const formData = JSON.parse(localStorage.getItem('gitHubIssuesFormData'));
        this.username = formData.username;
        this.repository = formData.repository;
        this.find();
      }
    },
    clear() {
      this.repository = '';
      this.username = '';
      this.issues = [];
    },
    find() {
      if (this.username === '' || this.repository === '') {
        return false;
      }

      localStorage.setItem('gitHubIssuesFormData', JSON.stringify({ username: this.username, repository: this.repository }));

      this.error = {};

      this.loading.issues = true;

      const url = `https://api.github.com/repos/${this.username}/${this.repository}/issues`;

      axios.get(url)
        .then((response) => {
          this.issues = response.data;
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => {
          this.loading.issues = false;
        });

      return true;
    },
    handleProps() {
      this.username = this.username.trim();
      this.repository = this.repository.trim();
    },
  },
};
</script>
