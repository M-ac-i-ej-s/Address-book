<template>
    <v-dialog :width="dialogWidth" class="Component">
        <template v-slot:activator="{ props }">
            <div class="component-container">
                <v-btn class="component-button" v-bind="props" :color="buttonColor" @click="resetErrors">
                    {{ buttonLabel }}
                </v-btn>
            </div>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card class="component">
            <div class="component-header">
                <div class="component-header-button">
                    <v-btn
                    variant="text"
                    size="small"
                    @click="isActive.value = false"
                    >X</v-btn>
                </div>
            </div>
            <div class="component-actions">
                <slot :isActive="() => isActive.value = false"></slot>
            </div>
          </v-card>
        </template>
      </v-dialog>
</template> 

<script>

export default {
    name: 'BaseDialog',
    props: {
        buttonLabel: String,
        dialogWidth: String,
        buttonColor: {
            type: String,
            default: 'white'
        },
        width: Number,
        resetErrors: Function
    },

}
</script>
<style lang="scss" scoped>
.component-container {
    .component-button {
        font-weight: 700;
}
}
.component-icon {
    color: gray;
    cursor: pointer;
    transition: 0.2s ease;
    border-radius: 50%;
    &:hover {
        color: #99a127;
    }
}
.Component {
    .component {
        padding: 10px 10px 20px 10px;
        .component-header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 5px 5px 0 5px;
        }
        .component-actions {
            display: flex;
            flex-direction: column;
            padding: 10px 50px 0 50px;
            gap: 20px;
        }
    }
}

</style>