# Open in Anything

A little Deno Deploy app to open any URL in another app or web-site.

At present it just supports opening git repos in various dev container tools,
but could potentially be used for lots of other apps.

Here's an example, to open this repo in your preferred dev container tool:

https://open-in.deno.dev/#https://github.com/jollytoad/open_in_anything

## Developing

Use the link above to start hacking on this project.

To run in dev mode:

```sh
deno task start
```

It's that easy.

## Adding a new tool

1. Create a new module under the [tools](./app/tools/) folder.
2. Import it into the [tools.ts](./app/lib/tools.ts) module.
3. Run `deno task ok`.
4. Test it.
5. Raise a PR.

## Ideas for the future

- Add URL support for:
  - specifying a branch, tag or commit
- In the app:
  - filter tools depending on their support for the repo host
  - add service worker to avoid server round trips
- Allow users to
  - select a preferred tool and auto open in that tool
  - hide tools they don't or can't use
  - add custom/private tools
  - (persist in local storage by default)
  - sign in, with google and popular git providers, to persist in kv
