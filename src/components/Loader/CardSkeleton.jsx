import Skeleton from "./Skeleton";

export default function CardSkeleton() {
    return (
        <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
                <div className="card-body text-center">
                    <Skeleton
                        width="60%"
                        height="18px"
                    />
                    <div className="mt-3">
                        <Skeleton
                            width="40%"
                            height="40px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}