<template>
  <div>
    <table class="table table-hover">
      <thead class="thead-inverse">
        <th>#</th>
        <th> Message</th>
        <th>Created Datetime</th>
      </thead>
      <tbody v-for="(item, index) in messages" :key="index">
        <th scope="row">
          {{index}}
        </th>
        <td>{{item.content}}</td>
        <td>{{item.createdDate}}</td>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ['messages']
}
</script>
