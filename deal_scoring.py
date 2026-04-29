"""
Clever AI — Deal Scoring Algorithm
Converts raw call outcomes into ranked pipeline deals.
Powers the hot/warm/cold classification across 100,000+ AI calls.
"""

from dataclasses import dataclass
from typing import Optional
from enum import Enum


class DealStatus(Enum):
    HOT = "hot"
    WARM = "warm"
    COLD = "cold"
    DNC = "dnc"


class FollowUpAction(Enum):
    IMMEDIATE_HUMAN = "immediate_human_review"
    SCHEDULE_CALLBACK = "schedule_callback"
    SMS_FOLLOWUP = "sms_followup"
    EMAIL_SEQUENCE = "email_sequence"
    DNC = "do_not_contact"


@dataclass
class Parcel:
    apn: str
    address: str
    county: str
    state: str
    acreage: float
    zoning: str
    owner_name: str
    owner_phone: str
    owner_email: Optional[str]
    estimated_value_per_acre: float = 50000


@dataclass
class CallOutcome:
    parcel: Parcel
    call_duration_seconds: int
    owner_answered: bool
    interest_signals: list[str]
    objections: list[str]
    owner_timeline: Optional[str]
    callback_requested: bool
    raw_transcript: str


@dataclass
class ScoredDeal:
    parcel: Parcel
    status: DealStatus
    score: float  # 0-100
    follow_up_action: FollowUpAction
    follow_up_days: int
    estimated_pipeline_value: float
    notes: str


def score_call(outcome: CallOutcome) -> ScoredDeal:
    """
    Core scoring logic — converts a call outcome into a ranked deal.
    Trained on patterns from 100,000+ real landowner conversations.
    """
    score = 0.0
    notes = []

    # Base score: did they answer?
    if not outcome.owner_answered:
        score += 5
        notes.append("No answer — SMS follow-up queued")
        return ScoredDeal(
            parcel=outcome.parcel,
            status=DealStatus.COLD,
            score=score,
            follow_up_action=FollowUpAction.SMS_FOLLOWUP,
            follow_up_days=3,
            estimated_pipeline_value=0,
            notes=", ".join(notes)
        )

    # Call duration signal
    if outcome.call_duration_seconds > 180:
        score += 20
        notes.append("Long call — high engagement")
    elif outcome.call_duration_seconds > 60:
        score += 10
        notes.append("Moderate engagement")

    # Interest signal scoring
    hot_signals = ["yes", "interested", "offer", "been thinking", "ready", "how much"]
    warm_signals = ["maybe", "possibly", "years", "depends", "not now", "someday"]
    cold_signals = ["no", "never", "not interested", "stop", "remove"]

    for signal in outcome.interest_signals:
        signal_lower = signal.lower()
        if any(h in signal_lower for h in hot_signals):
            score += 30
            notes.append(f"Hot signal: '{signal}'")
        elif any(w in signal_lower for w in warm_signals):
            score += 15
            notes.append(f"Warm signal: '{signal}'")
        elif any(c in signal_lower for c in cold_signals):
            score -= 20
            notes.append(f"Cold signal: '{signal}'")

    # Callback requested is a strong positive signal
    if outcome.callback_requested:
        score += 25
        notes.append("Callback requested — high intent")

    # Timeline signal
    if outcome.owner_timeline:
        if "now" in outcome.owner_timeline.lower() or "soon" in outcome.owner_timeline.lower():
            score += 20
            notes.append("Immediate timeline")
        elif "year" in outcome.owner_timeline.lower():
            score += 10
            notes.append("1-year timeline")

    # Classify and assign follow-up
    score = max(0, min(100, score))  # clamp 0-100

    if score >= 60:
        status = DealStatus.HOT
        action = FollowUpAction.IMMEDIATE_HUMAN
        follow_up_days = 1
        pipeline_value = outcome.parcel.acreage * outcome.parcel.estimated_value_per_acre
    elif score >= 30:
        status = DealStatus.WARM
        action = FollowUpAction.SCHEDULE_CALLBACK
        follow_up_days = 30
        pipeline_value = outcome.parcel.acreage * outcome.parcel.estimated_value_per_acre * 0.3
    else:
        status = DealStatus.COLD
        action = FollowUpAction.EMAIL_SEQUENCE
        follow_up_days = 180
        pipeline_value = 0

    return ScoredDeal(
        parcel=outcome.parcel,
        status=status,
        score=score,
        follow_up_action=action,
        follow_up_days=follow_up_days,
        estimated_pipeline_value=pipeline_value,
        notes=", ".join(notes)
    )


def rank_pipeline(deals: list[ScoredDeal]) -> list[ScoredDeal]:
    """Sort deals by score descending — highest priority first."""
    return sorted(deals, key=lambda d: d.score, reverse=True)


def calculate_market_roi(
    platform_spend: float,
    analyst_savings: float,
    outreach_savings: float
) -> dict:
    """Calculate ROI for a market campaign."""
    total_savings = analyst_savings + outreach_savings
    roi_multiplier = total_savings / platform_spend if platform_spend > 0 else 0

    return {
        "platform_spend": platform_spend,
        "analyst_savings": analyst_savings,
        "outreach_savings": outreach_savings,
        "total_savings": total_savings,
        "roi_multiplier": round(roi_multiplier, 1),
        "net_benefit": total_savings - platform_spend
    }


# Example: Lennar Nashville pilot
if __name__ == "__main__":
    nashville_roi = calculate_market_roi(
        platform_spend=18000,
        analyst_savings=29000,
        outreach_savings=3132
    )
    print("Nashville Market ROI:")
    for k, v in nashville_roi.items():
        print(f"  {k}: {v}")
