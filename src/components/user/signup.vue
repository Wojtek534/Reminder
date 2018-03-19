<template>
  <div class="col-xs-12 col-sm-8 col-md-6 mx-auto">
    <h3>New Account</h3>
    <hr>
    <div class="form-group">
      <label for="email">Mail</label>
      userCreate
      <input v-model.lazy="userData.email" type="text" id="email" class="form-control" placeholder="Email address">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      userCreate
      <input v-model.lazy="userData.password" type="password" id="password" class="form-control" placeholder="Password">
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      userCreate:{
        email: '',
        password: ''
      }
    }
  }
};
</script>
