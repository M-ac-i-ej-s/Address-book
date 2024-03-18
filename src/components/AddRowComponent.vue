<template>
    <tr class="Row">
        <td>
            <v-text-field
                label="Name"
                variant="outlined"
                v-model="address.name"
                hide-details="auto"
                class="row-input"
            ></v-text-field>
            <span class="row-error" v-if="!isEditing">
                {{errors.name}}
            </span>
        </td>
        <td>
            <v-text-field
                label="Lastname"
                variant="outlined"
                v-model="address.lastname"
                hide-details="auto"
                class="row-input"
            ></v-text-field>
            <span class="row-error" v-if="!isEditing">
                {{errors.lastname}}
            </span>
        </td>
        <td>
            <v-text-field
                label="Phone"
                variant="outlined"
                v-model="address.phone"
                type="number"
                hide-details="auto"
                class="row-input"
            ></v-text-field>
            <span class="row-error" v-if="!isEditing">
                {{errors.phone}}
            </span>
        </td>
        <td>
            <v-text-field
                label="Email"
                variant="outlined"
                v-model="address.email"
                hide-details="auto"
                class="row-input"
            ></v-text-field>
            <span class="row-error" v-if="!isEditing">
                {{errors.email}}
            </span>
        </td>
        <td class="text-center row-actions">
            <v-btn color="green" @click="handleAdd(address)">
                +
            </v-btn>
        </td>
    </tr>
</template>
<script>

export default {
    name: 'RowComponent',
    props: {
        handleAdd: Function,
        errors: Object,
        addresses: Array,
        isEditing: Boolean
    },
    data() {
        return {
            address: {
                id: '',
                name: '',
                lastname: '',
                phone: '',
                email: ''
            }
        }
    },
    watch: {
        addresses: {
            handler() {
                this.address = {
                    id: '',
                    name: '',
                    lastname: '',
                    phone: '',
                    email: ''
                }
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
.Row {
    height: 7rem;
    .row-actions {
        button {
            font-weight: 700;
            margin: 0 0 0.3rem 0;
        }
    }
    .row-error {
        position: absolute;
        font-size: 0.8rem;
        color: red;
    }
    .row-input {
        padding: 0 0 0.3rem 0;
    }
}
</style>