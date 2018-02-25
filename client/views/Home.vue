<template>
  <div class="container">
    <div class="columns">
      <div class="column p-2 col-2 bg-gray" style="height:100vh;">
        <div class="text-center">
          <figure class="avatar avatar-lg" data-initial="YZ" style="background-color: #5755d9;"></figure>          
          <h3>sitename.xyz</h3>
        </div>
        <ul class="nav">
          <li class="nav-item"><a href="#">Link</a></li>
          <li class="nav-item"><a href="#">Link</a></li>
          <li class="nav-item"><a href="#">Link</a></li>
          <li class="nav-item"><a href="#">Link</a></li>
          <li class="nav-item"><a href="#">Link</a></li>
        </ul>
      </div>
      <div class="column p-2 col-10">
        <div class="container">
          <div>
            <h1>Posts</h1>
            <button class="btn btn-primary"><i class="icon icon-lg icon-plus"></i> Add new post</button>
            <div class="divider"></div>  
          </div>        
          <div v-if="posts">
            <div class="columns">
              <div class="column p-1 m-2 col-12" :key="index" v-for="(post, index) in posts">
                <h2 style="margin-bottom:0;"><router-link :to="{ name: 'Edit', params: { filename: post.filename } }">{{ post.title }}</router-link></h2>
                <p class="text-uppercase text-gray">By {{ post.author }} Filed under: {{ post.tags }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="empty">
              <div class="empty-icon">
                <i class="icon icon-4x icon-mail"></i>
              </div>
              <p class="empty-title h5">You haven't write a single post!</p>
              <p class="empty-subtitle">Click the button to express what's on your mind.</p>
              <div class="empty-action">
                <button class="btn btn-primary">Add a post</button>
              </div>
            </div>
          </div>
          <div class="columns">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
   
  },
  computed: {
    ...mapState(['posts'])
  }
}
</script>

<style>
body {
  background: #fff;
}
</style>
