import Skeleton from "./Skeleton";
export default function TableSkeleton() {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <tbody>
                    {Array.from({length:10}).map((_, index)=>(
                        <tr key={index}>
                            <td>
                                <Skeleton height="20px"/>
                            </td>
                            <td>
                                <Skeleton height="20px"/>
                            </td>
                            <td>
                                <Skeleton height="20px"/>
                            </td>
                            <td>
                                <Skeleton height="20px"/>
                            </td>
                            <td>
                                <Skeleton height="20px"/>
                            </td>                                                       
                        </tr>
                    ))}
                    </tbody>
            </table>
        </div>
    );
}