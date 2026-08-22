import type { GenerationSettings } from "../../models/GenerationSettings";
import type { LocaleInfo } from "../../models/LocaleInfo";

interface ToolbarProps {
    settings: GenerationSettings;
    locales: LocaleInfo[];
    onSeedChange: (seed: string) => void;
    onRandomSeed: () => void;
    onLocaleChange: (locale: string) => void;
    onAvgLikesChange: (value: number) => void;
    onAvgReviewsChange: (value: number) => void;
}

export function Toolbar({
    settings,
    locales,
    onSeedChange,
    onRandomSeed,
    onLocaleChange,
    onAvgLikesChange,
    onAvgReviewsChange,
}: ToolbarProps) {
    return (
        <div className="container-fluid py-3 border-bottom">
            <div className="row g-3 align-items-end">

                {/* Language */}
                <div className="col-auto">
                    <label
                        htmlFor="locale"
                        className="form-label"
                    >
                        Language
                    </label>

                    <select
                        id="locale"
                        className="form-select"
                        value={settings.locale}
                        onChange={(e) =>
                            onLocaleChange(e.target.value)
                        }
                    >
                        {locales.map((locale) => (
                            <option
                                key={locale.code}
                                value={locale.code}
                            >
                                {locale.displayName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Seed */}
                <div className="col">
                    <label
                        htmlFor="seed"
                        className="form-label"
                    >
                        Seed
                    </label>

                    <div className="input-group">
                        <input
                            id="seed"
                            type="text"
                            className="form-control"
                            value={settings.seed}
                            onChange={(e) =>
                                onSeedChange(e.target.value)
                            }
                        />

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onRandomSeed}
                            title="Generate random seed"
                        >
                            🎲
                        </button>
                    </div>
                </div>

                {/* Likes */}
                <div className="col-auto">
                    <label
                        htmlFor="avgLikes"
                        className="form-label"
                    >
                        Likes per movie
                    </label>

                    <input
                        id="avgLikes"
                        type="number"
                        className="form-control"
                        min="0"
                        max="10"
                        step="0.1"
                        value={settings.avgLikes}
                        onChange={(e) =>
                            onAvgLikesChange(
                                Number(e.target.value)
                            )
                        }
                    />
                </div>

                {/* Reviews */}
                <div className="col-auto">
                    <label
                        htmlFor="avgReviews"
                        className="form-label"
                    >
                        Reviews per movie
                    </label>

                    <input
                        id="avgReviews"
                        type="number"
                        className="form-control"
                        min="0"
                        max="10"
                        step="0.1"
                        value={settings.avgReviews}
                        onChange={(e) =>
                            onAvgReviewsChange(
                                Number(e.target.value)
                            )
                        }
                    />
                </div>

            </div>
        </div>
    );
}