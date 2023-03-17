<template>
	<li class="aside-item" :class="{ active: active }">
		<router-link :to="href" slot="reference">
			<i :class="'el-icon-' + icon"></i>
			<span class="aside-item-name">
				<slot />
			</span>
		</router-link>
	</li>
</template>

<script>
	export default {
		props: {
			href: {
				type: String,
				required: true
			},
			icon: {
				type: String,
				required: true
			},
			activeOn: {
				type: String,
				required: true	
			}
		},
		computed: {
			active() {
				return new RegExp(`^/${this.activeOn}`).test(this.$route.fullPath)	
			}
		}
	}
</script>

<style>
li {
	list-style: none;
}

a {
	text-decoration: none;
}

.aside-item {
	padding: 15px;
	text-align: lef;
}

.aside-item a {
	color: rgba(255, 255, 255, .87);
}
.aside-item:hover a, .aside-item.active a {
	color: #42b883;
}

.aside-item a i {
	margin-right: 5px;
}
</style>