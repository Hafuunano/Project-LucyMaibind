export interface ZlibStatus {
    full: {
        10: number;
        30: number;
        60: number;
    };
    full_Error: {
        10: number;
        30: number;
        60: number;
    };
    zlib_Error: {
        10: number;
        30: number;
        60: number;
    };
}

export interface ServerStatus {
    details: {
        "maimai DX CN": {
            uptime: number;
        };
        "maimai DX CN DXNet": {
            uptime: number;
        };
        "maimai DX CN Main": {
            uptime: number;
        };
        "maimai DX CN NetLogin": {
            uptime: number;
        };
        "maimai DX CN Title": {
            uptime: number;
        };
        "maimai DX CN Update": {
            uptime: number;
        };
    };
    status: boolean;
}




