<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">VueJS - GithubIssues</a>
        </div>
      </nav>
    </header>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
