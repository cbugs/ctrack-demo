<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <vehicles-table />
      </div>
    </div>
  </div>
</template>

<script>
import VehiclesTable from "./components/VehiclesTable";

export default {
  name: "tables",
  components: {
    VehiclesTable,
  },
};
</script>
