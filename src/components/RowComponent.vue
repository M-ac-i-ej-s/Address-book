<template>
    <tr class="Row">
        <td>{{address.name}}</td>
        <td>{{address.lastname}}</td>
        <td>{{address.phone}}</td>
        <td>{{address.email}}</td>
        <td class="text-center row-actions">
            <EditComponent :address="address" :handleEdit="handleEdit" :errors="errors" :resetErrors="resetErrors"/>
            <v-btn color="error" @click="handleDeleteFun">
                Delete
            </v-btn>
        </td>
    </tr>
</template>
<script>
import EditComponent from './EditComponent.vue'
import Swal from 'sweetalert2';

export default {
    name: 'RowComponent',
    components: {
        EditComponent
    },
    props: {
        address: Object,
        handleDelete: Function,
        handleEdit: Function,
        errors: Object,
        resetErrors: Function
    },
    methods: {
        handleDeleteFun() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                    });
                    this.handleDelete(this.address.id);
                }
                });
        }
    }
}
</script>
<style lang="scss" scoped>
.Row {
    .row-actions {
        display: flex;
        align-items: center;
        justify-content: center;
        button {
            font-weight: 700;
            margin: 0 0.3rem 0 0.5rem;
        }
    }
}
</style>