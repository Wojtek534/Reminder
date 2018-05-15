<template>
  <div>
    <v-data-table class="table table-hover" :headers="[{text: 'Indeks'}, {text: 'Content'}, {text: 'Date'}]" :items=messages>
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox :input-value="props.item.selected" primary hide-details></v-checkbox>
        </td>
        <td class="text-xs-right">{{ props.item.index }}</td>
        <td class="text-xs-right">{{ props.item.content }}</td>
        <td class="text-xs-right">{{ props.item.createdDate }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: ['messages']
}
</script>
