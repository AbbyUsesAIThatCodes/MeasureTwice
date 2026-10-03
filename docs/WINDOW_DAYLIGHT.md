# Window Daylight Review Recipe

This extends the existing Sunny Woodshop baseline from EdugamesGraphicsStorage's `packs/measure-twice` source snapshot `3408719e614a0531eee21135b562462dbf824a5f`. The existing catalog and shared style guide were re-read October 3. The reusable consumer implementation is `src/window-daylight.js`; its caller, palette, room opening and light setup are in `src/workshop.js`.

## Parameters And Implementation

The generator accepts a Three.js namespace, a window centre in world units, half-width/half-height, receiving floor height and a downward direction vector. It projects each of four pane corners along that vector onto the horizontal receiving floor. Opaque mullion gaps remain between the four low-contrast patches. It returns a named group and its exact parameters as metadata. No external runtime assets, custom shader, animation, bloom or volumetric effects are required.

The pane projection is a deliberate static visual approximation, not a ray-traced beam. It belongs on a known empty floor receiver. A different room must recheck intersections and either relocate/split the patch or disable it; it is not an automatic arbitrary-geometry projector. The real back wall has four opaque sections around the window opening. The glass is transparent, and the directional key light enters from the back-window side with ordinary Three.js shadows. Do not place a solid wall behind the opening or use a luminous pane as the sole evidence of daylight.

The consumer uses sRGB output, ACES filmic tone mapping at exposure 1.12, PCF soft shadows and a 2,048-pixel key shadow map inherited from Sunny Woodshop. The pale warm four-pane patch uses `#FFE3A0`, opacity 0.22 and no depth writes. The renderer caps pixel ratio at 2. Hemisphere and cool-fill lighting remain steady. Daylight off removes the floor patch and lowers the key light, leaving measurement and semantic feedback readable; reduced motion needs no alternate path because the recipe is static.

Warm Timber and Log Cabin are two provisional review wall treatments on the same opening/layout/camera. The measuring surface remains plain. A hammer, square, screwdriver, saw and clamp replace repeated hammer silhouettes, each with visible mounting hardware.

## Provenance And Archive Boundary

Review screenshots include identical-view daylight on/off and both wall treatments. Source/build identifiers and file hashes are supplied in the review evidence. Existing public/archived sources and asset notices remain unchanged; this document grants no new original-art license.

EdugamesGraphicsStorage #12 remains open for the accepted shared archive. This implementation supplies an editable recipe and pinned consumer evidence for that review; it does not silently replace the shared catalog, global standards or other games. Teacher acceptance and physical classroom performance remain pending.
