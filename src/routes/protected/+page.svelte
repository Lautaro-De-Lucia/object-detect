<script lang="ts">
	//import Cam from './Cam.svelte';
    import { page } from "$app/stores"
    import Detect from '../Detec.svelte';
    import Snap from '../Snap.svelte';
    import Screen from '../Screen.svelte';
    import Speech from '../Speech.svelte';
    import Detectab from '../Detect.svelte';
    import Mic from '../Mic.svelte';
    import Subir from "../Subir.svelte";
</script>
{#if $page.data.session}
<h1></h1>
<p>
</p>
<Detect />
<Snap />
<Speech />
<Detectab />
<Mic />
{:else}
<h1>Access Denied</h1>
<p>
  <a href="/auth/signin">
    You must be signed in to view this page
  </a>
</p>
{/if}

