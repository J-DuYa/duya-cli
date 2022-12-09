interface Arguments {
    /** Non-option arguments */
    _: string[];
    /** The script name or node command */
    $0: string;
    /** All remaining options */
    [argName: string]: any;
}
interface IOpts {
    args?: Arguments;
}
export declare function run(_opts?: IOpts): Promise<void>;
export {};
