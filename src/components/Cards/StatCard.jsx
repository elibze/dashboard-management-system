export default function StatCard({ title, value, icon }) {
    return (
        <div className="col-12 col-sm-6 col-lg-3 mb-4">
            <div className="card shadow-sm h-100 border-0">
                <div className="card-body text-center">
                    <div className="display-6 text-primary mb-3">
                        {icon}
                    </div>

                    <h6 className="text-muted text-uppercase">
                        {title}
                    </h6>

                    <h2 className="fw-bold">
                        {value}
                    </h2>
                </div>
            </div>
        </div>
    );
}