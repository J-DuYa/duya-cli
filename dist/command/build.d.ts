interface IDuyaBuildOpts {
    cwd: string;
    args: {
        [name: string]: any;
    };
}
export default function build({ cwd, args }: IDuyaBuildOpts): Promise<void>;
export {};
