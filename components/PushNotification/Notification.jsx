import {Card, CardContent} from "/components/ui/card"
import {Button} from "/components/ui/button"
import {XIcon} from "lucide-react";
import PropTypes from "prop-types";

export default function Notification({onClose, data}) {
    if (!data) return null;
    return (
        <div className="fixed top-4 py-12 md:py-24 lg:right-4 w-full z-40 sm:w-auto">
            <div className="px-4 md:px-6 lg:px-8 xl:px-10">
                <Card className="border border-red-500 bg-red-50 shadow-lg rounded-xl">
                    <CardContent className="grid gap-2 p-4 sm:p-6 order-first">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <h4 className="text-lg font-medium text-red-600">Warning</h4>
                                <p className="text-sm text-red-700">You are making to much noise, please lower your voice, Decibel Value: {data?.decibelValue}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <XIcon className="h-4 w-4 text-red-600"/>
                            </Button>
                        </div>
                        <button
                            className="inline-flex h-9 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            onClick={onClose}
                        >
                            Okay, got it
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

Notification.propTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object,
};