import { fromEvent } from "rxjs";
import { scan } from "rxjs/operators";

export function createAnalytics(): { destroy: () => void } {
    let isDestroyed = false;
    const observable = fromEvent(document, "click")
        .pipe(
            scan(count => count + 1, 0)
        )
        .subscribe((count) => console.log("clicked", count));
    return {
        destroy: () => {
            observable.unsubscribe();
            isDestroyed = true;
        }
    }
}