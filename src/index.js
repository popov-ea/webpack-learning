import { Post } from "./Post";
import "./styles/styles.css";
import json from "./assets/json"; //format is not required by default
import logo from "./assets/logo"; // format is required by default. but added in webpack-config
import { interval } from "rxjs";
import { scan } from "rxjs/operators";
// const unused = " ";
const post = new Post("webpack post title", logo);
console.log(post.toString());
console.log("json", json);
interval(1000)
    .pipe(
        scan(count => count + 1, 0)
    )
    .subscribe(count => console.log("count", count))