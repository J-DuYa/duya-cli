interface IBundleConfig {
    entry: string;
    projectPath: string;
}
interface IRollupConfig {
    rollupCfg: {
        input: string;
        output: {
            dir: string;
            format: 'umd' | 'esm';
            sourcemap: boolean;
            name: string;
            inlineDynamicImports: boolean;
            file: string;
        };
        plugins: Array<any>;
    };
}
export default function getRollupConfig({ entry, projectPath, }: IBundleConfig): IRollupConfig;
export {};
