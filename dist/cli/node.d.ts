export declare function checkVersion(): void;
export declare function setNodeTitle(name?: string): void;
export declare function setNoDeprecation(): void;
/**
 * Check for configuration files
*/
export declare function getExistFile({ cwd, files, returnRelative }: {
    cwd: string;
    files: Array<string>;
    returnRelative: boolean;
}): string | undefined;
