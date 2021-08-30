export default {
    name: 'router-link',
    props: {
        to: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            default: 'a',

        }
    },
    render(_c) {
        return (
            <this.tag {...this.attrs} onClick={() => {
                this.$router.push(this.to)
            }}>
                {this.$slots.default}
            </this.tag>
        )
    }
}
