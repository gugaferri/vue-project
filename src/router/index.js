import Vue from 'vue';
import Router from 'vue-router';
import GitHubIssues from '@/components/GitHubIssues';
import GitHubIssue from '@/components/GitHubIssue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: GitHubIssues,
    },
    {
      path: '/issue/:username/:repository/:number',
      name: 'Issue',
      component: GitHubIssue,
    },
  ],
});
