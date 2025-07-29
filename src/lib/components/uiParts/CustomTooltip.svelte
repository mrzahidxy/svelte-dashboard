<script lang="ts">
	import { Tooltip } from 'bits-ui';

	interface Props {
		title: string;
		delay?: number;
	}

	let { title, delay = 200 }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={delay}>
		<Tooltip.Trigger
			class="border-border-input bg-background-alt shadow-btn ring-dark ring-offset-background hover:bg-muted
			focus-visible:ring-dark focus-visible:ring-offset-background inline-flex
			size-5 cursor-pointer items-center justify-center rounded-full border
			focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
		>
			?
		</Tooltip.Trigger>

		<Tooltip.Content sideOffset={8}>
			<div
				class="rounded-input border-dark-10 bg-background shadow-popover z-0 flex
				items-center justify-center border bg-white p-3 text-sm font-medium outline-hidden"
			>
				{title}
			</div>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
